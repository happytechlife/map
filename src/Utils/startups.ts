import { IStartup, IHappyTechStore } from "../models";

export const startupLink = (startup: IStartup) => `/startups/${startupLinkName(startup)}`;
export const startupLinkName = (startup: IStartup) => toCompareStartupName(startup.name);
export const toCompareStartupName = (name: string) => name.toLocaleLowerCase().replace(/ /g, '-');
export const getStartup = (store: IHappyTechStore, name: string) => store.startups.find(s => startupLinkName(s) === name.toLocaleLowerCase())

export const getStartupUrl = (route: string, startup: IStartup) => route.replace(':name', startupLinkName(startup));

