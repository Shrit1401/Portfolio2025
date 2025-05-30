import Tag from "./Tag";

interface TagListProps {
  tags: Array<{
    name: string;
    slug: {
      current: string;
    };
  }>;
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Tag key={tag.slug.current} name={tag.name} slug={tag.slug.current} />
      ))}
    </div>
  );
}
