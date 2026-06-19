import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { siteContent } from "@/content/site";
import {
  aboutFrontmatterSchema,
  articleFrontmatterSchema,
  projectFrontmatterSchema,
  serviceFrontmatterSchema,
  type AboutEntry,
  type ArticleEntry,
  type ProjectEntry,
  type ServiceEntry,
  type SiteContent,
} from "@/lib/content/schemas";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

async function readCollection<T>(
  directory: string,
  parseFrontmatter: (value: unknown) => Omit<T, "body">,
): Promise<T[]> {
  const collectionDirectory = path.join(CONTENT_ROOT, directory);
  const fileNames = (await fs.readdir(collectionDirectory)).filter((fileName) =>
    fileName.endsWith(".mdx"),
  );

  const entries = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(collectionDirectory, fileName);
      const source = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(source);

      return {
        ...parseFrontmatter(data),
        body: content.trim(),
      } as T;
    }),
  );

  return entries;
}

export async function getSiteContent(): Promise<SiteContent> {
  return siteContent;
}

export async function getAboutEntry(): Promise<AboutEntry> {
  const filePath = path.join(CONTENT_ROOT, "about.mdx");
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    ...aboutFrontmatterSchema.parse(data),
    body: content.trim(),
  };
}

export async function getAllArticles(): Promise<ArticleEntry[]> {
  return readCollection<ArticleEntry>("articles", (value) =>
    articleFrontmatterSchema.parse(value),
  );
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  return readCollection<ProjectEntry>("projects", (value) =>
    projectFrontmatterSchema.parse(value),
  );
}

export async function getAllServices(): Promise<ServiceEntry[]> {
  return readCollection<ServiceEntry>("services", (value) =>
    serviceFrontmatterSchema.parse(value),
  );
}

export async function getArticleBySlug(slug: string): Promise<ArticleEntry | undefined> {
  const articles = await getAllArticles();

  return articles.find((entry) => entry.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<ProjectEntry | undefined> {
  const projects = await getAllProjects();

  return projects.find((entry) => entry.slug === slug);
}

export async function getServiceBySlug(slug: string): Promise<ServiceEntry | undefined> {
  const services = await getAllServices();

  return services.find((entry) => entry.slug === slug);
}
