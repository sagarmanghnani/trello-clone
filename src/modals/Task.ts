export class Task {
    task_id:number;
    task_name:string;
    description:string;
    attachments:string[];
    owners_ids:number[];
    created_at:string;
    updated_at:string;
    created_by:number;
    state_id:number;
    assigned_to:number[];
}