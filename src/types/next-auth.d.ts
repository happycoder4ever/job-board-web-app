import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ added
      name: string;
      email: string;
      role: "JOB_SEEKER" | "EMPLOYER";
    };
  }

  interface User {
    id: string; // ✅ added
    role: "JOB_SEEKER" | "EMPLOYER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // ✅ added
    role: "JOB_SEEKER" | "EMPLOYER";
  }
}
