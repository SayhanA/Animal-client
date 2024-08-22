"use client";

import { getAnimals } from "@/apis/animalAPIs";
import Heading from "@/components/atoms/Heading";
import LText from "@/components/atoms/LText";
import Loading from "@/components/molecules/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function TestComponent() {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["animals"],
    queryFn: getAnimals,
  });


  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="m-[8%]">
      <Heading className="text-center mb-[52px]">Assets</Heading>
      <div className="flex gap-[80px]">
        {data &&
          data.length > 0 &&
          data.map(({id, name, imageUrl, category}) => (
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
          ))}
      </div>
    </main>
  );
}
