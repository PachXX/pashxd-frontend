"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      className={cn("w-full", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg p-1 text-muted-foreground bg-muted"
)

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants(), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-all",
        "data-[state=active]:bg-white data-[state=active]:text-[#16A34A] data-[state=active]:shadow-sm",
        "text-slate-500",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-6", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }