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

          if (target.body && target.body.body && target.body.body.length > 0) {
            for (var i = 0; i < target.body.body.length; i++) {
              var node = target.body.body[i];
              var leadingCommentsIndex = node.leadingComments ? node.leadingComments.length - 1 : 0;

              if (node.leadingComments && node.leadingComments[leadingCommentsIndex].type === 'CommentBlock') {
                var left = parentName;
                var isDefined = false;
                var comment = node.leadingComments[leadingCommentsIndex].value.replace(/\*|\n|\t/g, "");

                if (comment) {
                  var commentList = comment.split("@");

                  for (var index = 0; index < commentList.length; index++) {
                    var expression = commentList[index];
                    expression = expression.trim();

                    if (index === 0) {
                      if (/\s+/g.test(expression)) {
                        return;
                      }

                      if (!expression) {
                        return;
                      }

                      if (expression !== 'constructor') {
                        left += "." + expression;

                        if (!isDefined) {
                          isDefined = true;

                          var defLeft = left;
                          var defRight = "{}";
                          var defLeftExpression = t.identifier(defLeft);
                          var defRightExpression = t.identifier(defRight);
                          var defAssignmentExpression = t.AssignmentExpression("=", defLeftExpression, defRightExpression);
                          var defExpressionStatement = t.ExpressionStatement(defAssignmentExpression);

                          path.node.body.splice(-1, 0, defExpressionStatement);
                        }
                      }
                    } else {
                      expression = expression.replace(/\s/g, "");

                      var expressionList = expression.split(":");

                      if (!expressionList[1]) {
                        return;
                      }

                      var newLeft = left + "['" + expressionList[0] + "']";
                      var newRight = /^\d+|true|false$/gi.test(expressionList[1]) ? expressionList[1] : '"' + expressionList[1] + '"';
                      var newLeftExpression = t.identifier(newLeft);
                      var newRightExpression = t.identifier(newRight);
                      var assignmentExpression = t.AssignmentExpression("=", newLeftExpression, newRightExpression);
                      var expressionStatement = t.ExpressionStatement(assignmentExpression);

                      path.node.body.splice(-1, 0, expressionStatement);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
};

module.exports = exports["default"];