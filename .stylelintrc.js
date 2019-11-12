module.exports = {
  "rules": {
    // 缩进风格
    "indentation": [2, {
      "except": ["value"],
      "severity": "warning"
    }],
    // 最多允许空函数
    "max-empty-lines": 2,
    // 属性与值之间冒号前后的风格
    "declaration-colon-space-before": "never",
    "declaration-colon-space-after": "always",
    // 大括号之后需要新的一行
   "block-opening-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    // 大括号与选择器之间需要空格
    "block-opening-brace-space-before": "always",
  }
}