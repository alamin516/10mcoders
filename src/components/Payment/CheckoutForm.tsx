import { useLoadUserQuery } from '@/lib/features/api/apiSlice';
import { useCreateCourseMutation } from '@/lib/features/courses/coursesApi';
import { useCreateOrderMutation } from '@/lib/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: any;
};

const CheckoutForm: React.FC<Props> = ({ setOpen, data }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>("");
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const {} = useLoadUserQuery("loadUser");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            setMessage((error as any).message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false)
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            toast.success("Payment successful! Redirecting...");
            redirect(`/course-access/${data._id}`);
        }

        if (error) {
            const errorMessage = (error as any).data.message;
            toast.error(errorMessage);
        }
    }, [orderData, error, data._id]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button
                className="bg-blue-500 text-white w-full py-2 text-center mt-5 rounded-md"
                disabled={isLoading || !stripe || !elements}
                id="submit"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message" className="text-red-500 mt-2">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
