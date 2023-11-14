import { ReportInterface, UserInterface } from "./interfaces/data";

export function createUsersDataRow({
    id,
    name,
    email,
    dateCreated,
}: UserInterface) {
    return { id, name, email, dateCreated };
}

export function createReportsDataRow({
    id,
    userId,
    title,
    content,
    dateCreated,
}: ReportInterface) {
    return { id, userId, title, content, dateCreated };
}