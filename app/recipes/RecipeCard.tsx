"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Recipe } from "@/types/supabase"
import { cn, shimmer, toBase64 } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { TypographyLarge, TypographySmall } from "@/components/ui/typography"

type RecipeCardProps = {
  recipe: Recipe
  className: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const { author, id, img, quote, recipe_name, slug, tags, user_id } = recipe
  const path = usePathname()

  return (
    <article
      className={cn(
        `rounded-lg transition-all group relative dark:hover:bg-slate-800 duration-300 ease-in-out border border-foreground/40`,
        className
      )}
    >
      <AspectRatio ratio={4 / 3}>
        <Image
          src={img || `https://placehold.it/350`}
          alt={recipe_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-auto h-auto rounded-lg group-hover:saturate-[1.1] transition-transform duration-300 m-0"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(304, 203)
          )}`}
        />
      </AspectRatio>
      <div className="absolute top-0 left-0 flex w-full p-2 max-w-fit">
        {tags.map(({ tag, id }) => (
          <Badge key={id} className="mx-1">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="absolute inset-x-0 w-11/12 p-3 mx-auto text-white rounded-md drop-shadow-md bg-slate-800/70 bottom-1 dark:text-foreground backdrop-blur">
        <div className="flex items-center justify-between">
          <TypographyLarge>
            <Link
              href={`/recipes/${slug}`}
              className={cn(
                "overflow-hidden underline lg:no-underline transition-all duration-300 ease-in-out hover:underline text-ellipsis whitespace-nowrap",
                path !== "/recipes" && "text-center"
              )}
            >
              {recipe_name}
            </Link>
          </TypographyLarge>

          {/* <Heart /> */}
        </div>

        {path === "/recipes" && (
          <TypographySmall>
            <em>"{quote}" - </em>
            {user_id ? (
              <Link
                href={`/profile/${user_id}`}
                className="block mr-auto transition-all duration-300 ease-in-out hover:underline"
              >
                {author}
              </Link>
            ) : (
              author
            )}
          </TypographySmall>
        )}
      </div>
    </article>
  )
}
