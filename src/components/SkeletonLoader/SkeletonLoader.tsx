import "./SkeletonLoader.css"
import { FC } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectTodos } from "../../redux/todos"

export const SkeletonLoader: FC = () => {
  const { skeletonStatus, error } = useAppSelector(selectTodos)

  return (
    <div
      className={
        skeletonStatus === "loading" || skeletonStatus === "failed"
          ? "skeleton"
          : ""
      }
    >
      {skeletonStatus === "loading" && "Loading . . ."}
      {skeletonStatus === "failed" && error}
    </div>
  )
}
