exports.default = function (babel) {
  var t = babel.types;

  return {
    visitor: {
      Program(path, state) {
        var target = path.node.body.filter(function (node) {
          return node.type === "ClassDeclaration";
        }).shift();

        if (target) {
          var parentName = target.id.name;

          target.body.body.map(function (node) {
            if (node.leadingComments && node.leadingComments[0].type === 'CommentBlock') {
              var left = parentName;
              var comment = node.leadingComments[0].value.replace(/\*|\n|\t|\s/g, "");
              var commentList = comment.split("@");

              commentList.map(function loop(expression, index) {
                if (index === 0) {
                  if (expression !== 'constructor') {
                    left += "." + expression;
                  }
                } else {
                  var expressionList = expression.split(":");
                  var newLeft = left + "." + expressionList[0];console.log(newLeft);
                  var newRight = /^\d+|true|false$/gi.test(expressionList[1]) ? expressionList[1] : '"' + expressionList[1] + '"';
                  var newLeftExpression = t.identifier(newLeft);
                  var newRightExpression = t.identifier(newRight);
                  var assignmentExpression = t.AssignmentExpression("=", newLeftExpression, newRightExpression);
                  var expressionStatement = t.ExpressionStatement(assignmentExpression);

                  path.node.body.splice(-1, 0, expressionStatement);
                }
              });
            }
          });
        }
      }
    }
  };
};

module.exports = exports["default"];