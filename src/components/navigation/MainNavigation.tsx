import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MainNavigation = () => {
  return (
    <TabsList className="grid w-full grid-cols-7">
      <TabsTrigger value="scope">Scope & Tasks</TabsTrigger>
      <TabsTrigger value="labor">Labor Costs</TabsTrigger>
      <TabsTrigger value="equipment">Equipment</TabsTrigger>
      <TabsTrigger value="roster">Roster</TabsTrigger>
      <TabsTrigger value="contract">Contract</TabsTrigger>
      <TabsTrigger value="summary">Summary</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
  );
};