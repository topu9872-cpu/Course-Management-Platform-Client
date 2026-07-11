import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileText,
  Award,
  PlusCircle,
  Users,
  BarChart3,
  UserCheck,
  FolderOpen,
  CreditCard,
  Star,
  User,
  Settings,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export const studentNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/student",
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: BookOpen,
    path: "/dashboard/student/my-courses",
  },
  
  {
    id: "assignments",
    label: "Assignments",
    icon: FileText,
    path: "/dashboard/student/assignments",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: Award,
    path: "/dashboard/student/certificates",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/dashboard/student/profile",
  },
 
];

export const instructorNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/instructor",
  },
  {
    id: "create-course",
    label: "Create Course",
    icon: PlusCircle,
    path: "/dashboard/instructor/create-course",
  },
  {
    id: "manage-courses",
    label: "Manage Courses",
    icon: BookOpen,
    path: "/dashboard/instructor/manage-courses",
  },
  {
    id: "students",
    label: "Students",
    icon: Users,
    path: "/dashboard/instructor/students",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/dashboard/instructor/profile",
  },

];

export const adminNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/admin",
  },
  {
    id: "users",
    label: "Users",
    icon: UserCheck,
    path: "/dashboard/admin/users",
  },
  {
    id: "courses",
    label: "Courses",
    icon: GraduationCap,
    path: "/courses",
  },
  {
    id: "categories",
    label: "Categories",
    icon: FolderOpen,
    path: "/dashboard/admin/categories",
  },
  {
    id: "enrollments",
    label: "Enrollments",
    icon: CreditCard,
    path: "/dashboard/admin/enrollments",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    path: "/dashboard/admin/reviews",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/dashboard/admin/profile",
  },

];
