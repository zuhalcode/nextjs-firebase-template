import db from "@/lib/db";
import { NextResponse } from "next/server";

// Handler untuk membaca produk (GET)
export async function GET() {
  try {
    const productsSnapshot = await db.collection("products").get();
    const products = productsSnapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ data: products, message: "aman coy" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products", error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { name, description, imageUrl, category, price } = await req.json();

  const productData = {
    name,
    price,
    description,
    category,
    imageUrl,
    createdAt: new Date(),
  };

  try {
    const newProduct = await db.collection("products").add(productData);
    return NextResponse.json({
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create products", error },
      { status: 500 },
    );
  }
}
