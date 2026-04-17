type CollapsedTabProps = {
  completedSteps: number;
  totalSteps: number;
  onExpand: () => void;
};

export function CollapsedTab({
  completedSteps,
  totalSteps,
  onExpand,
}: CollapsedTabProps) {
  return (
    <button
      onClick={onExpand}
      aria-label="Open quickstart panel"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 px-2 py-4 bg-(--color-panel-solid) border border-r-0 border-(--gray-6) rounded-l-md shadow-lg cursor-pointer hover:bg-(--gray-2) transition-colors"
    >
      <span className="text-xs font-medium tracking-wide [writing-mode:vertical-rl] rotate-180">
        Quickstart
      </span>
      <span className="text-xs text-(--gray-10)">
        {completedSteps}/{totalSteps}
      </span>
    </button>
  );
}
