import { ChangeEvent, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import SliderValue from '../atoms/SliderValue';
import { OutlinedButton, TextButton } from 'src/helpers/common/atoms/Buttons';
import { Item } from 'src/stores/skill.interface';

const AddSkill = ({
  addHandler,
  items,
  hasLevel = false,
}: {
  addHandler: ({ name, level }: Item) => void;
  items: Item[];
  hasLevel: boolean;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
    setName('');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorText('');
  };

  const doneHandler = () => {
    if (items.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      setErrorText('Duplicate entry');
    } else {
      setName('');
      setErrorText('');
      addHandler({ name, level });
    }
  };

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    doneHandler();
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name]);

  const formEl = (
    <form onSubmit={submitHandler}>
      <TextField
        label="Skill"
        variant="filled"
        value={name}
        fullWidth
        required
        error={!!errorText}
        helperText={errorText}
        onChange={changeHandler}
        autoComplete="off"
      />
      {hasLevel && <SliderValue level={level} setLevel={setLevel} />}
      <div className="flex gap-2 mt-3">
        <OutlinedButton onClick={doneHandler} disabled={disabled}>
          Done
        </OutlinedButton>
        <TextButton onClick={toggleForm}>Cancel</TextButton>
      </div>
    </form>
  );

  return showForm ? formEl : <OutlinedButton onClick={toggleForm}>+ Add more</OutlinedButton>;
};

export default AddSkill;
