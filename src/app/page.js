// "use client";

// import { getAnimals } from "@/apis/animalAPIs";
// import Heading from "@/components/atoms/Heading";
// import { useQuery } from "@tanstack/react-query";

// import Image from "next/image";
// import { useState } from "react";

// export default function TestComponent() {
//   const [animals, setAnimals] = useState([]);
//   const { data, error, isLoading, isSuccess } = useQuery({
//     queryKey: "test",
//     queryFn: getAnimals,
//   });

//   if (isSuccess) {
//     setAnimals(data);
//   }

//   console.log(animals);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <main className="m-[8%]">
//       <Heading className="text-center">Assets</Heading>
//       <img src={data && data[1]?.imageUrl} />
//     </main>
//   );
// }

"use client";

import { getAnimals } from "@/apis/animalAPIs";
import Heading from "@/components/atoms/Heading";
import LText from "@/components/atoms/LText";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function TestComponent() {
  // React Query automatically manages the state, so no need for useState here
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["test"],
    queryFn: getAnimals,
  });

  // console.log(data); // You can log data directly

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="m-[8%]">
      <Heading className="text-center mb-[52px]">Assets</Heading>
      <div className="flex gap-[80px]">
        {data &&
          data.length > 0 &&
          data.map((data) => (
            <div key={data?.id}>
              <Image
                className="w-[160px] h-[191px] object-contain gap-[42px]"
                src={data?.imageUrl}
                width={160}
                height={191}
                alt="Picture of the author"
              />
              <LText className="text-center">{data.name}</LText>
            </div>
          ))}
      </div>
    </main>
  );
}
