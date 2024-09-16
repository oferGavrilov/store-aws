import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import React, { useMemo } from 'react'
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import Header from '@/components/Header';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
        data: tasks,
        isError,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    const [displayOptions, setDisplayOptions] = React.useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-US",
    });

    const ganttTasks = useMemo(() => {
        return (
            tasks?.map((task) => ({
                start: new Date(task.startDate as string),
                end: new Date(task.dueDate as string),
                name: task.title,
                id: `Task-${task.id}`,
                type: "task" as TaskTypeItems,
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisabled: false,
            })) || []
        )
    }, [tasks]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions({
            ...displayOptions,
            viewMode: event.target.value as ViewMode,
        });
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching tasks</div>

    return (
        <div className="max-w-full p-8">
            <header className="mb-4 flex items-center justify-between">
                <Header name="Projects Timeline" />
                <div className="relative inline-block w-64">
                    <select
                        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                        value={displayOptions.viewMode}
                        onChange={handleViewModeChange}
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                    </select>
                </div>
            </header>

            <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
                <div className="timeline">
                    <Gantt
                        tasks={ganttTasks}
                        {...displayOptions}
                        columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                        listCellWidth="100px"
                        projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                        projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                        projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Timeline