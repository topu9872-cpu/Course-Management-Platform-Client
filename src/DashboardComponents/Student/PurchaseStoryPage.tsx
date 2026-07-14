"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Skeleton,
} from "@heroui/react";

type Courses = {
  _id: string;
  title: string;
  instructor: string;
  category: string;
  enrollDate: string;
  duration: string;
  paymentStatus?: string;
  progress?: string;
  price: string;
};

type MyCoursesProps = {
  studentCourses: Courses[];
};

const PurchaseStoryPage = ({ studentCourses }: MyCoursesProps) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log(studentCourses);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Purchase History
        </h1>
        <p className="text-zinc-500 mt-1">
          Review your transaction records and payment status.
        </p>
      </div>

      <div className="border border-zinc-300 rounded-lg overflow-hidden bg-white">
        <Table
          aria-label="Purchase history"
          shadow="none"
          classNames={{
            base: "w-full",
            th: "bg-white text-zinc-500 font-medium border-b border-zinc-200 py-4",
            td: "py-4 text-zinc-700",
          }}
        >
          <TableHeader>
            <TableColumn>COURSE</TableColumn>
            <TableColumn>INSTRUCTOR</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No records found">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-1/2 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-1/3 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-1/4 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              : studentCourses.map((item) => (
                  <TableRow
                    key={item._id}
                    className="border-b border-zinc-200 text-center last:border-none hover:scale-101 hover:bg-zinc-50/50"
                  >
                    <TableCell className="font-medium text-zinc-900">
                      {item.title}
                    </TableCell>
                    <TableCell>{item.instructor}</TableCell>
                    <TableCell className="text-zinc-500">
                      {item.enrollDate}
                    </TableCell>
                    <TableCell className="font-medium">{item.price}</TableCell>
                    <TableCell>
                      <Chip className="font-bold bg-green-100 text-center px text-green-500 rounded-full">
                        {item.paymentStatus}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseStoryPage;
