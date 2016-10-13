export default function ({ types: t }) {
  return {
    visitor: {
      ClassMethod(path, state) {
        var parentName = path.parentPath.parentPath.node.id.name;

        if (path.node.leadingComments[0].type === 'CommentBlock') {
          var left = parentName;
          var comment = path.node.leadingComments[0].value.replace(/\*|\n|\t|\s/g, "");
          var commentList = comment.split("@");

          commentList.map(function loop(expression, index) {
            if (index === 0) {
              if (expression !== 'constructor') {
                left += "." + expression;
              }
            } else {
              var expressionList = expression.split(":");
              var newLeft = left + "." + expressionList[0];
              var newRight = /^\d+|true|false$/gi.test(expressionList[1]) ? expressionList[1] : '"' + expressionList[1] + '"';
              var newLeftExpression = t.identifier(newLeft);
              var newRightExpression = t.identifier(newRight);
              var assignmentExpression = t.AssignmentExpression("=", newLeftExpression, newRightExpression);
              var expressionStatement = t.ExpressionStatement(assignmentExpression);

              path.parentPath.parentPath.parentPath.node.body.splice(-1, 0, expressionStatement);
            }
          });
        }
      }
    }
  };
}