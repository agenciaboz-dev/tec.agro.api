import { Crop } from "@prisma/client"
import promptObj from "prompt-sync"
import { crop } from "../src/crop"

const prompt = promptObj()

const input: Crop = {
    id: 0,
    date: new Date(),
    name: prompt("name: "),
    description: prompt("description: "),
    price: Number(prompt("price: ")),
    weight: Number(prompt("weight: ")),
    producerId: Number(prompt("producerId: ")),
    image: prompt("image: "),
    gallery: prompt("gallery: "),
    rating: Number(prompt("rating: ")),
    sold: Number(prompt("sold: ")),
}

console.log("inserting new crop..")

crop.new(input, (result: Crop) => console.log(result))
