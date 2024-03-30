const Task = require("../../../models/Tasks");
const connectDB = require("../../../connect");
import { NextResponse } from "next/server";

//CREATE
export async function POST(req) {
  try {
    await connectDB();
    const { task } = await req.json();
    console.log(task);

    const taskDoc = await Task.create({ task });
    return NextResponse.json({ taskDoc, msg: "task created successfully" });
    // res.status(201).json({ task });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json(error);
  }
}

//GET
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find().sort("-createdAt");
    return NextResponse.json({ tasks });
  } catch (error) {
    console.log(error);
    console.log("error:", error);
    return NextResponse.json(error);
  }
}

//PATCH
export async function PATCH(req) {
  await connectDB();
  const { _id, task } = await req.json();
  console.log(_id, task);
  await Task.updateOne(
    { _id: _id },
    { task: task },
    {
      new: true,
      runValidators: true,
    }
  );
  return NextResponse.json({ msg: "task updated successfully" });
}

//DELETE
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

     await Task.findOneAndDelete({ _id: _id });
    return NextResponse.json({ msg: "task deleted successfully" });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json(error);
  }
}
