import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CleaningTask, TaskCategory } from '@/data/types/taskManagement';
import { useToast } from '@/components/ui/use-toast';

const taskSchema = z.object({
  category: z.enum(['Core Cleaning', 'Specialized Cleaning', 'Industry-Specific Cleaning']),
  taskName: z.string().min(1, 'Task name is required'),
  productivityRate: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Must be a positive number',
  }),
  minimumQuantity: z.string().optional().refine((val) => val === undefined || val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
    message: 'Must be a non-negative number',
  }),
  chargeRate: z.string().optional().refine((val) => val === undefined || val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
    message: 'Must be a non-negative number',
  }),
  measurementUnit: z.enum(['SQM/hour', 'Units/hour']),
  notes: z.string().optional(),
});

interface TaskFormProps {
  onSubmit: (task: Omit<CleaningTask, 'id'>) => void;
  initialData?: CleaningTask;
  mode?: 'create' | 'edit';
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, mode = 'create' }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData ? {
      ...initialData,
      productivityRate: String(initialData.productivityRate),
      minimumQuantity: initialData.minimumQuantity ? String(initialData.minimumQuantity) : '',
      chargeRate: initialData.chargeRate ? String(initialData.chargeRate) : '',
    } : {
      category: 'Core Cleaning',
      taskName: '',
      productivityRate: '',
      minimumQuantity: '',
      chargeRate: '',
      measurementUnit: 'SQM/hour',
      notes: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof taskSchema>) => {
    onSubmit({
      category: values.category as TaskCategory,
      taskName: values.taskName,
      productivityRate: parseFloat(values.productivityRate),
      minimumQuantity: values.minimumQuantity ? parseFloat(values.minimumQuantity) : undefined,
      chargeRate: values.chargeRate ? parseFloat(values.chargeRate) : undefined,
      measurementUnit: values.measurementUnit,
      notes: values.notes,
    });
    form.reset();
    toast({
      title: `Task ${mode === 'create' ? 'Created' : 'Updated'} Successfully`,
      description: `The task "${values.taskName}" has been ${mode === 'create' ? 'added to' : 'updated in'} the database.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  <SelectItem value="Industry-Specific Cleaning">Industry-Specific Cleaning</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taskName"
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
          name="minimumQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Quantity (optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chargeRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charge Rate per Unit (optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="measurementUnit"
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
                  <SelectItem value="Units/hour">Units/hour</SelectItem>
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
                <Textarea placeholder="Add notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{mode === 'create' ? 'Add Task' : 'Update Task'}</Button>
      </form>
    </Form>
  );
};