import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type SelectProps = {
  placeholder?: string;
  onChange: (currentValue: string) => void;
  options: {
    displayText: string;
    value: string;
  }[];
  defaultValue?: {
    displayText: string;
    value: string;
  };
};

const Select: React.FC<SelectProps> = ({
  onChange,
  options,
  placeholder = "",
  defaultValue,
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [focussedIndex, setFocussedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<
    (typeof options)[0] | undefined
  >(defaultValue);

  function incrementFocussed() {
    setFocussedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
  }

  function decrementFocussed() {
    setFocussedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    const { key } = event;
    if (key === "ArrowUp" || key === "ArrowDown" || key === "Enter") {
      if (!optionsOpen) {
        setOptionsOpen(true);
        // setFocussedIndex(1);
      } else {
        if (key === "ArrowUp") {
          decrementFocussed();
        } else if (key === "ArrowDown") {
          incrementFocussed();
        }
      }
    }
  }

  function handleReset() {
    setSelectedOption(undefined);
    setFocussedIndex(-1);
    setOptionsOpen(false);
  }

  function handleSelectClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!optionsOpen) {
      setOptionsOpen(true);
    } else {
      // only set selected option if option button is clicked
      if (event.target instanceof HTMLButtonElement) {
        setSelectedOption(options[focussedIndex]);
      }
      onChange(selectedOption?.value || "");
      setOptionsOpen(false);
    }
  }

  useEffect(() => {
    onChange(selectedOption?.value || "");
  }, [selectedOption]);

  return (
    <div
      className={`relative z-20 min-w-48  *:rounded max-sm:w-full ${
        !optionsOpen ? "drop-shadow-sm" : "drop-shadow-md"
      }`}
      onKeyDown={handleKeyPress}
      onClick={handleSelectClick}
    >
      <button className="flex w-full items-center justify-between gap-10 bg-light-element px-4 py-3 font-normal dark:bg-dark-element">
        <span
          className={`capitalize ${
            !selectedOption
              ? "text-light-text-input dark:text-dark-text-input"
              : "italic"
          }`}
        >
          {selectedOption ? selectedOption?.displayText : placeholder}
        </span>
        {
          // value || focussedIndex > -1
          selectedOption || focussedIndex > -1 ? (
            <XMarkIcon
              className="size-4"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
            />
          ) : (
            <ChevronDownIcon className="size-4" />
          )
        }
      </button>

      {/* options */}
      {optionsOpen && (
        <div
          className={
            "absolute inset-x-0 top-[calc(100%+0.25rem)] flex min-h-fit flex-col bg-light-element py-3 *:text-left dark:bg-dark-element"
          }
        >
          {options.map((option, index) => {
            return (
              <button
                className={`bg-transparent px-4 py-2 [transition-direction:alternate] hover:bg-light-background/30 dark:hover:bg-dark-background/30 ${
                  focussedIndex === index
                    ? "bg-light-background/50 dark:bg-dark-background/50 "
                    : ""
                }`}
                onClick={() => setSelectedOption(option)}
                key={option.value}
                onFocus={() => setFocussedIndex(index)}
              >
                {option.displayText}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Select;
