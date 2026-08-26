import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { sidebarItems, type SidebarItem } from "../../config/sidebar";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Otomatis buka dropdown jika path saat ini cocok dengan child di dalam menu
  useEffect(() => {
    sidebarItems.forEach((menu) => {
      if (menu.children) {
        const isActiveChild = menu.children.some(child => location.pathname === child.path);
        if (isActiveChild) {
          setOpenMenus(prev => ({ ...prev, [menu.label]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-[#135f38] text-white min-h-screen flex flex-col transition-all duration-300 shadow-xl z-20">
      {/* Header Sidebar */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">
          R
        </div>
        <span className="font-bold text-lg tracking-wide">Ramadhan Admin</span>
      </div>

      {/* Render Menu Dinamis dari Config */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((menu, index) => {
          const IconComponent = menu.icon;
          const hasChildren = !!menu.children;
          const isActive = location.pathname === menu.path;
          const isOpen = openMenus[menu.label];

          return (
            <div key={index} className="flex flex-col">
              {hasChildren ? (
                <button
                  onClick={() => toggleMenu(menu.label)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                    isOpen ? "bg-white/10 text-white font-medium" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={20} />
                    <span>{menu.label}</span>
                  </div>
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              ) : (
                <Link
                  to={menu.path!}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive ? "bg-white/20 text-white font-medium" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{menu.label}</span>
                </Link>
              )}

              {/* Render Child Menu */}
              {hasChildren && isOpen && (
                <div className="mt-1 flex flex-col space-y-1 pl-4">
                  {menu.children!.map((child, childIndex) => {
                    const ChildIcon = child.icon;
                    const isChildActive = location.pathname === child.path;
                    return (
                      <Link
                        key={childIndex}
                        to={child.path!}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${
                          isChildActive 
                            ? "bg-[#187541] text-white font-medium" 
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="w-4 flex justify-center">
                          <ChildIcon size={16} />
                        </div>
                        <span className="text-sm">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
