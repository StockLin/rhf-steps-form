import { useState } from "react";

function useModal() {
  const [open, setOpen] = useState(false);

  const toggle = (open: boolean) => setOpen(open);

  return {
    open,
    toggle,
  };
}

export default useModal;
