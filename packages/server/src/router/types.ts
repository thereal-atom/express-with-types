import express from "express";
import { z } from "zod";

interface BaseRequestZodT {
    "params": z.ZodObject<any>;
    "query": z.ZodObject<any>;
};

interface BaseRequest<T extends BaseRequestZodT> extends express.Request {
    "params": z.infer<T["params"]>;
    "query": z.infer<T["query"]>;
};

export interface GetRequestZodT extends BaseRequestZodT {};

export interface GetRequest<T extends GetRequestZodT> extends BaseRequest<T> {};

export interface Response extends express.Response {};

export interface GetResponse<T extends z.ZodObject<any>> extends Response {
    json: (data: z.infer<T>) => this;
};