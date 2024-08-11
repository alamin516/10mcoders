"use client";
import {
  useEditLayoutDataMutation,
  useGetHeroDataQuery,
} from "@/lib/features/layout/layoutApi";
import { styles } from "@/styles/style";
import { ContentCopy, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  title: string;
}

const EditCategories: React.FC = () => {
  const { data, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayoutData, { isSuccess, error }] = useEditLayoutDataMutation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories ?? []);
      setOriginalCategories(data.layout.categories ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error, refetch]);

  const hasChanges = () => {
    return JSON.stringify(categories) !== JSON.stringify(originalCategories);
  };

  const handleCategoryChange = (index: any, title: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = { ...updatedCategories[index], title };
    setCategories(updatedCategories);
  };

  const handleCopyCategory = (index: number) => {
    const copiedCategory = { ...categories[index] };
    setCategories([...categories, copiedCategory]);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      title: "",
    };
    setCategories([...categories, newCategory]);
  };

  const handleSave = async () => {
    if (categories.some((category) => !category?.title.trim())) {
      toast.error("Category field cannot be empty.");
      return;
    }

    await editLayoutData({
      type: "Categories",
      categories,
    });
  };

  return (
    <div className="w-[98%] 800px:w-[90%] 1100px:w-[60%] mx-auto space-y-4">
      <div className="flex justify-between items-center border-b-2 pb-3">
        <h1 className="text-xl font-semibold dark:text-white">
          All Categories
        </h1>
        <div>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Category
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded ml-2"
            disabled={!hasChanges()}
          >
            Save
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-[20%]">
          No categories yet. Click the {"Add Category"} button to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((category: any, index) => (
            <div key={category._id} className="flex items-center space-x-4">
              <input
                type="text"
                value={category?.title}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded dark:text-white text-[#000000c7] text-base p-3 w-full font-Josefin bg-transparent border-none outline-none"
                placeholder="Category Name"
              />
              <button
                onClick={() => handleCopyCategory(index)}
                className={`${styles.button} !w-10 !h-10`}
              >
                <ContentCopy />
              </button>
              <button
                onClick={() => {
                  setCategories((prevCategory) =>
                    prevCategory.filter((_, i: any) => i !== index)
                  );
                }}
                className={`${styles.button} !w-10 !h-10`}
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditCategories;
