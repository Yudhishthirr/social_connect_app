
type IconSet = "Feather" | "MaterialIcons";

type SettingItem = {
    id: string;
    label: string;
    meta?: string;
    icon: {
      set: IconSet;
      name: string;
    };
};
  
type Section = {
    title: string;
    items: SettingItem[];
};
  
const sections: Section[] = [
    {
      title: "Account Activity",
      items: [
        { id: "saved", label: "Saved", icon: { set: "Feather", name: "bookmark" } },
        { id: "archive", label: "Archive", icon: { set: "Feather", name: "rotate-ccw" } },
        { id: "activity", label: "Your activity", icon: { set: "Feather", name: "activity" } },
        { id: "notifications", label: "Notifications", icon: { set: "Feather", name: "bell" } },
        { id: "time-management", label: "Ai Chat", icon: { set: "Feather", name: "clock" } },
      ],
    },
    {
      title: "Privacy Policies",
      items: [
        { id: "privacy", label: "Account privacy", meta: "Public", icon: { set: "Feather", name: "lock" } },
        { id: "close-friends", label: "Close Friends", meta: "2", icon: { set: "Feather", name: "star" } },
        { id: "blocked", label: "Blocked", meta: "9", icon: { set: "Feather", name: "slash" } },
      ],
    },
    {
      title: "Others interact's",
      items: [
        { id: "messages", label: "Messages and story replies", icon: { set: "Feather", name: "message-circle" } },
        { id: "comments", label: "Comments", icon: { set: "Feather", name: "message-square" } },
        { id: "tags", label: "Tags and mentions", icon: { set: "Feather", name: "at-sign" } },
    
      ],
    },
];

export {
    IconSet, sections
};

