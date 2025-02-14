import { allservices } from "@/constants/data";
import { headers } from "@/constants/headers";
import { ICategory } from "@/interfaces";
import axios from "axios";
import Link from "next/link";
import { FC, useMemo, useState } from "react";

interface AllServicesModelProps {}
const AllServicesModel: FC<AllServicesModelProps> = ({}) => {
  const { isSuccess, data } = {
    isSuccess:false,
    data:{
      data:[
        {
          _id:"",
          name:"",
          
        }

      ]
    }
  }
  // const memorizedChidrenCategories = useMemo(() => {
  //   const catChildren = [];
  //   data?.data.map(async (category) => {
  //     const res = await axios.get(
  //       "/api/servicecategories/" + category._id + "/sub",
  //       { headers }
  //     );
  //     catChildren.push(res.data.data);
  //   });
  //   return catChildren;
  // }, [data?.data]);

  // const catalogs = useMemo(() => {
  //   const arr: {}[] = [];
  //   if (isSuccess) {
  //     for (let i in data?.data) {
  //       const {_id,children,icon,name,options,parent} = data.data[i];
  //       for (let j in memorizedChidrenCategories) {
  //         const cat1 = data.data[i];
  //         const cat2 = memorizedChidrenCategories[j];
  //         if (cat1.children.length > 0) {
  //           arr.push({
  //             _id,children: [{...cat2}],
  //             name,
  //             options,
  //             icon,
  //             parent
  //           });
  //         } else {
  //           arr.push(data.data[i]);
  //         }
  //       }
  //     }
  //   }
  //   return arr;
  // }, [data?.data, isSuccess, memorizedChidrenCategories]);

  // console.log(catalogs);

  return (
    <main className="fixed z-50 bg-white top-24 bottom-0 left-0 right-0">
      <div className="w-full h-full flex justify-center items-center flex-wrap gap-x-8 gap-y-4 px-6 lg:px-40 py-8 overflow-y-auto ">
        <h1 className="text-center text-3xl font-sans text-afruna-blue border-b p-3">
          Services Cataloging
        </h1>
        {/* all services categories */}
        {isSuccess &&
          data.data.map((category) => {
            return (
              <div
                key={category._id}
                className="max-w-[14rem] list-item list-disc w-full flex-col justify-start items-start"
              >
                <Link href={`/all_services/${category._id}`}>
                  <h2 className="text-sm hover:p-3 capitalize hover:text-xs hover:border-b-afruna-gray hover:border-b hover:translate-x-3 hover:text-center hover:text-afruna-blue/90 hover:transition-all">
                    {category.name}
                  </h2>
                </Link>
                <div></div>
              </div>
            );
          })}
        {allservices.map(({ name, services }, index) => {
          return (
            <div key={index} className="flex max-w-[14rem] w-full flex-col justify-start items-start">
              <h2 className="text-sm font-bold">{name}</h2>
              {services.map((serv, index) => {
                return <p key={index} className="text-[0.68rem] mt-1 font-medium"> {serv}</p>;
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AllServicesModel;
