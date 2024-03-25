import { ReactElement, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type TabsProps = {
  tabs: string[];
  currentTab?: string;
  onTabClick: (tab: string) => void;
  className?: string;
};

export type TabItemProps = {
  tab: string;
  isCurrentTab?: boolean;
  onClick: (tab: string) => void;
};

export const TabItem = ({
  tab,
  isCurrentTab,
  onClick,
}: TabItemProps): ReactElement => {
  return (
    <div
      onClick={() => onClick(tab)}
      className={twMerge(
        "text-md h-[44px] px-4 py-2 cursor-pointer",
        isCurrentTab ? "font-bold" : "font-normal",
        isCurrentTab ? "text-blue-800" : "text-gray-400 hover:text-gray-500",
        isCurrentTab ? "border-violet-800 border-b-2" : "", // "border-gray-500 hover:border-b-2",
      )}
    >
      {tab}
    </div>
  );
};

export const Tabs = ({
  tabs,
  currentTab,
  onTabClick,
  className,
}: TabsProps): ReactElement => {
  useEffect(() => {
    if (currentTab) onTabClick(currentTab);
  }, [currentTab, onTabClick]);

  return (
    <div
      className={twMerge("flex justify-start items-center gap-1", className)}
    >
      {tabs.map((tab) => (
        <TabItem
          key={tab}
          tab={tab}
          isCurrentTab={tab === currentTab}
          onClick={onTabClick}
        />
      ))}
    </div>
  );
};
