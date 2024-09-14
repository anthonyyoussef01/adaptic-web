"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { UserAvatar } from "@/components/shared/user-avatar";

import { Skeleton } from "./skeleton";

interface AvatarGroupProps {
  users?: User[] | any;
  href?: string;
  size?: number;
  className?: string;
  bgColor?: number[];
  fgColor?: number[];
  initialUsersCount?: number;
}

export function AvatarGroup({
  users,
  href,
  size,
  className,
  bgColor,
  fgColor,
  initialUsersCount = 4,
}: AvatarGroupProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className={cn("my-2 flex items-center -space-x-1.5", className)}>
      {href && users && users.length > 0 ? (
        <div className="mr-0.5 shrink-0">
          <Button
            variant="secondary"
            rounded="full"
            style={
              bgColor && {
                backgroundColor:
                  `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})` ||
                  "transparent",
              }
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              size ? `size-${size * 2}` : "size-8",
              "flex items-center justify-center overflow-hidden p-0",
            )}
          >
            <div
              className="flex size-full items-center justify-center rounded-full border-2 p-0 hover:scale-105 hover:border-neutral-100 dark:hover:border-neutral-900"
              style={
                fgColor &&
                bgColor && {
                  borderColor:
                    `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})` ||
                    "transparent",
                  backgroundColor: hovered
                    ? `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]}, 0.3)`
                    : `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]}, 0.2)` ||
                      "transparent",
                }
              }
            >
              <Link
                href={href}
                style={
                  fgColor && {
                    color: hovered
                      ? `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]}, 0.8)`
                      : `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})` ||
                        "transparent",
                  }
                }
              >
                <Icons.add className={cn(size ? `size-${size}` : "size-4")} />
              </Link>
            </div>
          </Button>
        </div>
      ) : (
        <Skeleton className="size-8 animate-pulse rounded-full" />
      )}
      {users && users.length > 0 ? (
        users.slice(0, initialUsersCount).map((user: any, index: number) => (
          <UserAvatar
            size="sm"
            key={index}
            user={{
              name: user.name || null,
              image: user.image || null,
            }}
            style={
              fgColor &&
              bgColor && {
                borderColor:
                  `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})` ||
                  "transparent",
              }
            }
            className={cn(size ? `size-${size * 2}` : "size-8", "z-0 border-2")}
          />
        ))
      ) : (
        <div className="flex items-center -space-x-1.5">
          <Skeleton className="size-8 animate-pulse rounded-full" />
          <Skeleton className="size-8 animate-pulse rounded-full" />
          <Skeleton className="size-8 animate-pulse rounded-full" />
        </div>
      )}
      {users && users.length > initialUsersCount && (
        <div
          style={
            fgColor && {
              color:
                `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})` || "white",
            }
          }
          className={cn(
            size && size <= 3 ? `text-[10px]` : "text-sm",
            "px-2 font-bold tracking-tight",
          )}
        >
          + {users.length - initialUsersCount}
        </div>
      )}
    </div>
  );
}
