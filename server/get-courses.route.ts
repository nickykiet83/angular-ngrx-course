

import { Request, Response } from 'express';
import { COURSES } from "./db-data";



export function getAllCourses(req: Request, res: Response) {

    console.log("Retrieving courses data ...");

    res.status(200).json({ payload: Object.values(COURSES) });

}


export function getCourseById(req: Request, res: Response) {

    const courseId = parseInt(req.params["id"], 0);

    const courses = Object.values(COURSES);

    const foundCourse = courses.find(course => course.id === courseId);

    res.status(200).json(foundCourse);
}
