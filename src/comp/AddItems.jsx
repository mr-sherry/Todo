import React, { memo } from "react";

function AddItems({ itemEdit, itemRemover, items }) {
  console.log("hello i am here add");

  return (
    <>
      {items.map((item) => (
        <p key={item.id}>
          {item.value}
          <button onClick={() => itemRemover(item.id)}>Remove</button>
          <button onClick={() => itemEdit(item.id, item.value)}>Edit</button>
        </p>
      ))}
    </>
  );
}

export default memo(AddItems);
