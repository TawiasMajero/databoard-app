"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        🧪 Тестовое задание: <br></br> UI-интерфейс для управления данными
      </h1>
      <h2 className="text-lg text-gray-600 mb-8 text-center max-w-md">
        🎯 Цель:<br></br> Создать интерфейс для отображения, сортировки и
        редактирования разных сущностей, используя универсальные
        переиспользуемые компоненты.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-2xl">
        <div className="bg-blue-500 text-white text-center p-4 rounded-lg shadow">
          <Link href="/products" className="hover:underline transition">
            Products
          </Link>
        </div>
        <div className="bg-green-500 text-white text-center p-4 rounded-lg shadow">
          <Link href="/price-plans" className="hover:underline transition">
            Price Plans
          </Link>
        </div>
        <div className="bg-purple-500 text-white text-center p-4 rounded-lg shadow">
          <Link href="/pages" className="hover:underline transition">
            Pages
          </Link>
        </div>
      </div>
    </div>
  );
}
