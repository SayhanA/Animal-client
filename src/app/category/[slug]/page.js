"use client";

import { getAnimals, getAnimalsFilter, getCategories } from "@/apis/animalAPIs";
import Button from "@/components/atoms/Button";
import LText from "@/components/atoms/LText";
import Loading from "@/components/molecules/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dynamic = ({ params }) => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const data = { category: params.slug };

  const { data: animals, isLoading: AllanimalsLoading } = useQuery({
    queryKey: ["allAnimals", data],
    queryFn: () => getAnimalsFilter({ data }),
  });

  const handleAnimal = () => {
    console.log("handleAnimals");
  }

  const handleCategory = () => {
    console.log("handle Category");
  }

  if (categoriesLoading || AllanimalsLoading) return <Loading />;
  if (categoriesError) return <div>Error: {error.message}</div>;

  return (
    <main className="m-[8%]">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="flex gap-[24px]">
          {categoriesData.length > 0 &&
            categoriesData?.map(({ id, category }) =>
              category === params.slug ? (
                <Link href="/category" key={id} className="button-green">
                  <LText className="text-green-400">{category} Animal</LText>
                </Link>
              ) : (
                <Link
                  href={`/category/${category}`}
                  key={id}
                  className="button-red"
                >
                  <LText className="text-red-400">{category}</LText>
                </Link>
              )
            )}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleAnimal}>Add Animal</Button>
          <Button onClick={handleCategory}>Add Category</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-[80px] mt-[71px]">
        {animals && animals?.length > 0 ? (
          animals?.map(({ id, name, imageUrl, category }) => (
            <Link href={`/category/${category}`} key={id}>
              <Image
                className="w-[160px] h-[191px] object-contain gap-[42px]"
                src={imageUrl}
                width={160}
                height={191}
                alt="Picture of the author"
              />
              <LText className="text-center text-white">{name}</LText>
            </Link>
          ))
        ) : (
          <div className="text-white h-[40vh] w-full flex justify-center items-center">Data Not Available</div>
        )}
      </div>
    </main>
  );
};

export default Dynamic;
