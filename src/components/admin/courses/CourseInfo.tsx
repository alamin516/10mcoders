import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { styles } from "@/styles/style";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInfo: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories ?? []);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-5">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            name="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Course Name"
            className={`${styles.input}`}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description">Course Description</label>
          <textarea
            name="description"
            cols={30}
            rows={6}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            placeholder="Write something new......."
            className={`${styles.input} !h-min py-2`}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <div className="w-[50%]">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="99"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="estimatedPrice"> Estimated Price (optional)</label>
            <input
              type="number"
              name="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="59"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="w-[50%]">
            <label htmlFor="tags">Course Tags</label>
            <input
              type="text"
              name="tags"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="React, MERN, Node, CSS, HTML"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label className="">Course Categories</label>
            <select
              name=""
              value={courseInfo.category}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
              className={`${styles.input} dark:bg-slate-800`}
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="w-[50%]">
            <label htmlFor="level">Course level</label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Level"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="demoUrl">Course Demo URL</label>
            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="Demo URL"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="file"
            className={`w-full min-h-[15vh] dark:border-white border-green-500 p-3 border flex items-center justify-center rounded-md ${
              dragging ? "bg-slate-900/60" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo?.thumbnail}
                width={100}
                height={100}
                alt="Course Thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span>
                Drag and drop course thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="mt-4 w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-10 bg-green-500 rounded-md text-center text-white cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
