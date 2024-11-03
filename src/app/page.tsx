"use client";


import { Header } from "@/components/header";
import { BlogSection } from "@/components/blog-section";
import { LoginSearch } from "@/components/login-search";
import { useState , useEffect} from "react";

export default function HomePage() {
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // สร้าง state สำหรับจัดเก็บข้อมูลการค้นหา
  const userId = localStorage.getItem("20b6c672f3f1");




  const updateCartCount = async () => {

    console.log("Call Data");
    try {
      const response = await fetch("http://3.0.50.174:4000/cart/"+userId);
      if (!response.ok) throw new Error(`Failed to fetch cart data: ${response.statusText}`);
      const data = await response.json();
      const totalQuantity = data.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      setTotalItems(totalQuantity);
      console.log("totalQuantity cart data:", totalQuantity);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("95c0c5912b84");

    if (!token) {
      window.location.href = "/login"; // Redirect ไปหน้า Home หลังจากกดปุ่ม OK
    }


  
    updateCartCount();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("95c0c5912b84");

    if (!token) {
      window.location.href = "/login"; // Redirect ไปหน้า Home หลังจากกดปุ่ม OK
    }
    console.log("Search query in HomePage:", searchQuery);
  }, [searchQuery]);

  return (
    <>
    <Header totalItems={totalItems} />
    <LoginSearch setSearchQuery={setSearchQuery} />
      <BlogSection updateCartCount={updateCartCount}  searchQuery={searchQuery} />
    </>
  );
}
