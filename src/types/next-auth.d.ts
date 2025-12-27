import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "JOB_SEEKER" | "EMPLOYER";
    };
  }

  interface User {
    role: "JOB_SEEKER" | "EMPLOYER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "JOB_SEEKER" | "EMPLOYER";
  }
}
