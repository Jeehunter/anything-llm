import React from "react";
import PropTypes from "prop-types";
import { HandWaving } from "@phosphor-icons/react";
import { useHomePageActions } from "@/hooks/useHomePageActions";

const CHECKLIST_STORAGE_KEY = "anythingllm_checklist_completed";

export const CHECKLIST_ITEMS = [
  {
    id: "create_workspace",
    title: "Create a workspace",
    description: "Create your first workspace to get started",
    action: "Create",
    handler: "createWorkspace",
    completed: false,
  },
  {
    id: "send_chat",
    title: "Send a chat",
    description: "Start a conversation with your AI assistant",
    action: "Chat",
    handler: "sendChat",
    completed: false,
  },
  {
    id: "embed_document",
    title: "Embed a document",
    description: "Add your first document to your workspace",
    action: "Embed",
    handler: "embedDocument",
    completed: false,
  },
  {
    id: "setup_system_prompt",
    title: "Set up a system prompt",
    description: "Configure your AI assistant's behavior",
    action: "Set Up",
    handler: "setSystemPrompt",
    completed: false,
  },
  {
    id: "define_slash_command",
    title: "Define a slash command",
    description: "Create custom commands for your assistant",
    action: "Define",
    handler: "setSlashCommand",
    completed: false,
  },
  {
    id: "visit_community",
    title: "Visit Community Hub",
    description: "Explore community resources and templates",
    action: "Browse",
    handler: "visitCommunityHub",
    completed: false,
  },
];

export function ChecklistItem({ id, title, description, action, handler, completed: defaultCompleted }) {
  const actions = useHomePageActions();
  const [isCompleted, setIsCompleted] = React.useState(() => {
    const stored = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!stored) return defaultCompleted;
    const completedItems = JSON.parse(stored);
    return completedItems[id] || defaultCompleted;
  });

  const handleComplete = async (e) => {
    e.preventDefault();
    const stored = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    const completedItems = stored ? JSON.parse(stored) : {};
    completedItems[id] = true;
    window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedItems));
    setIsCompleted(true);

    await actions[handler]();
  };

  return (
    <div
      className="flex items-center gap-x-4 hover:opacity-80 transition-colors cursor-pointer"
      onClick={!isCompleted ? handleComplete : undefined}
    >
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
        <HandWaving size={24} className="text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-white text-sm">{title}</h3>
        <p className="text-[#9F9FA0] text-xs">{description}</p>
      </div>
      {isCompleted ? (
        <div className="w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-[#6CE9A6] rounded-full" />
        </div>
      ) : (
        <button className="w-[78px] h-9 rounded-md bg-[#36BFFA] text-black font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center">
          {action}
        </button>
      )}
    </div>
  );
}

ChecklistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  handler: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
