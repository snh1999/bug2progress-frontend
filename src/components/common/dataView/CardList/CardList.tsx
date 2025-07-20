import { CardItem, TCardItemProps, } from "@/components/common/dataView/CardList/CardItem";

type TCardListProps = {
  listItems: Array<TCardItemProps>;
};

export function CardList({ listItems }: TCardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 lg:px-6">
      {listItems.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </div>
  );
}
