import { Controller, Get, Query, Context, Post, Param } from "@restyjs/core";

@Controller("/sample")
export class SampleController {
  @Get("/search")
  search(@Query("name") name: string, @Query("email") email: string) {
    return {
      name,
      email,
    };
  }

  @Get("/error")
  error() {
    throw new Error("sample error");
  }

  @Get("/health")
  health(ctx: Context) {
    return ctx.res.json({ status: "ok" }).status(200);
  }

  @Post("/health")
  postHealth(ctx: Context) {
    return ctx.res.json({ status: "ok" }).status(200);
  }

  @Get("/:id")
  getByID(@Param("id") id: string) {
    return {
      id: id,
    };
  }
}
