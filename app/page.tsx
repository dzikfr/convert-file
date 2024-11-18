import Card from "@/components/Card";
import Link from "next/link";
import React from "react";

const Home = () => {
  const cards = [
    {
      link: "/removebg",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Remove Background",
      description: "Remove your background image",
    },
    {
      link: "/resizeimg",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Resize Image",
      description: "Resize your image to smaller size",
    },
    {
      link: "/texttoimg",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Text to Image",
      description: "Create image from your text",
    },
    {
      link: "/speechtotext",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Speech to Text",
      description: "Convert speech to text",
    },
    {
      link: "/imgtopdf",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Image to PDF",
      description: "Convert image to PDF",
    },
    {
      link: "/wordtopdf",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      name: "Word to PDF",
      description: "Convert word to PDF",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 p-4">
      {cards.map((card, index) => (
        <div key={index} style={{ width: "100%", maxWidth: "300px" }}>
          <Card
            link={card.link}
            image={card.image}
            name={card.name}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
