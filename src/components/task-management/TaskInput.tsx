import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from '@/data/types/productivity';

const taskSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Task name is required"),
  productivityRate: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Must be a positive number",
  }),
  unit: z.string().min(1, "Unit is required"),
  notes: z.string().optional(),
});

interface TaskInputProps {
  onAddTask: (task: Task) => void;
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      category: "",
      name: "",
      productivityRate: "",
      unit: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    onAddTask({
      id: crypto.randomUUID(),
      category: values.category,
      name: values.name,
      productivityRate: parseFloat(values.productivityRate),
      unit: values.unit,
      notes: values.notes || '',
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Core Cleaning">Core Cleaning</SelectItem>
                  <SelectItem value="Specialized Cleaning">Specialized Cleaning</SelectItem>
                  <SelectItem value="Industry-Specific">Industry-Specific</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter task name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productivityRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Productivity Rate</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Measurement Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SQM/hour">SQM/hour</SelectItem>
                  <SelectItem value="units/hour">Units/hour</SelectItem>
                  <SelectItem value="linear-m/hour">Linear m/hour</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Add notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Task</Button>
      </form>
    </Form>
  );
};