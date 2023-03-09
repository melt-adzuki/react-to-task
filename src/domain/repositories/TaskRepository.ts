import ResponseProvider from "../../ResponseProvider";
import Task from "../models/Task";

export default interface TaskRepository {
    add(task: Task): Promise<ResponseProvider>
}
