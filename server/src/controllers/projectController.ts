import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` });
    }
}

export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        res.json(project); 
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` });
    }
}