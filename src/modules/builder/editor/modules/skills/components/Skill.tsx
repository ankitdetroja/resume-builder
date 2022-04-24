import { Item } from 'src/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';
import { motion } from 'framer-motion';

const animation = {
  initial: { height: '1px' },
  animate: { height: '100%' },
};

export default function Skill({
  items,
  addItem,
  removeItem,
  setItems,
  hasLevel,
}: {
  items: Item[];
  addItem: ({ name, level }: Item) => void;
  removeItem: (index: number) => void;
  setItems: (name: Item[]) => void;
  hasLevel: boolean;
}) {
  const addHandler = (item: Item) => {
    addItem(item);
  };

  const deleteHandler = (index: number) => {
    removeItem(index);
  };

  const itemsArrayEl = items.length ? (
    <motion.div
      className="flex flex-col gap-2 mb-8"
      initial={animation.initial}
      animate={animation.animate}
    >
      <DragContainer items={items} setItems={setItems}>
        {items.map((item, index) => (
          <SkillPill
            key={item.name}
            index={index}
            name={item.name}
            level={item.level}
            onDelete={deleteHandler}
            showLevel={hasLevel}
          />
        ))}
      </DragContainer>
    </motion.div>
  ) : null;

  return (
    <>
      {itemsArrayEl}
      <AddSkill addHandler={addHandler} items={items} hasLevel={hasLevel} />
    </>
  );
}
