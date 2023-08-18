const Blog = require("../../models/blog");

exports.edit = async (req, res) => {
  const data = await Blog.findByPk(req.params.id);
  const edit = true;
  res.render("admin/posts/edit", { data, edit });
};

exports.create = async (req, res) => {
  const edit = false;
  const data = undefined;
  res.render("admin/posts/edit", { data, edit });
};

exports.store = async (req, res) => {
  if (req.body.id) {
    const data = await Blog.update(
      {
        name: req.body.name,
        slug: req.body.slug,
        content: req.body.content,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (data) {
      return res.redirect("/admin/dashboard");
    }
  } else {
    try {
      const data = Blog.create({
        name: req.body.name,
        slug: req.body.slug,
        content: req.body.content,
        categoryId: 1,
      });
      if (data) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      console.error(error.message);
			return res.redirect("/admin/blogs/create");
    }
  }
};

exports.delete = async (req, res) => {
  if (req.body.id) {
    const data = await Blog.destroy({
      where: { id: req.body.id },
    });
    if (data) {
      return res.redirect("/admin/dashboard");
    }
  }
};
