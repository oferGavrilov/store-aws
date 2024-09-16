import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (
    req: Request,
    res: Response
) => {
    try {
        const { projectId } = req.query;
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId)
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` });
    }
}

export const createTask = async (
    req: Request,
    res: Response
) => {
    const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
    } = req.body;

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        });
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` });
    }
}

export const updateTaskStatus = async (
    req: Request,
    res: Response
) => {
    const { taskId } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status
            }
        })

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` });
    }
}

export const getUserTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userId } = req.params;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) },
                ],
            },
            include: {
                author: true,
                assignee: true,
            },
        });
        res.json(tasks);
    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Error retrieving user's tasks: ${error.message}` });
    }
};