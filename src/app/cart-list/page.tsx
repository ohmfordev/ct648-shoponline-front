
"use client";

import { Header } from "@/components/header";
import { Component } from "@/components/component";
import { Component2 } from "@/components/component-2";
import { useState, useEffect } from "react";

export default function ChartListPage() {
  const [totalItems, setTotalItems] = useState(0);
  const userId = localStorage.getItem("20b6c672f3f1");
  // ฟังก์ชันดึงข้อมูลจำนวนสินค้าจากตะกร้า
  const updateCartCount = async () => {
    try {
      const response = await fetch("http://3.0.50.174:4000/cart/"+userId);
      if (!response.ok) throw new Error(`Failed to fetch cart data: ${response.statusText}`);
      const data = await response.json();
      const totalQuantity = data.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      setTotalItems(totalQuantity);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // เรียกใช้ updateCartCount เมื่อหน้าเพจโหลดครั้งแรก
  useEffect(() => {
    const token = localStorage.getItem("95c0c5912b84");

    if (!token) {
      window.location.href = "/login"; // Redirect ไปหน้า Home หลังจากกดปุ่ม OK
    }
    updateCartCount();
  }, []);

  return (
    <>
      <Header totalItems={totalItems} /> {/* ส่ง totalItems ไปที่ Header */}
      <Component  updateCartCount ={updateCartCount}/>
      {/* <Component2 /> */}
    </>
  );
}
