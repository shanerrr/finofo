import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { GROUP_BY_OPTIONS } from "@/lib/constants";

export default function MenuBar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Fruits</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Add New Fruit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Group</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Group</MenubarSubTrigger>
            <MenubarSubContent>
              {GROUP_BY_OPTIONS.map((option) => (
                <MenubarItem key={option.value}>
                  Group by {option.label}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Clear Grouping</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
