import type mdIt from "markdown-it";

export const link = (md: mdIt) => {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const attrIndex = token.attrIndex("target");
       
    // 設定されていない場合、追加
    if (attrIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"])
      return self.renderToken(tokens, idx, options)
    } 

    // 値が設定されていれば、新しく設定
    if (tokens[idx].attrs?.length)
      tokens[idx].attrs[attrIndex][1] = "_blank"
    
    return self.renderToken(tokens, idx, options)
  }
};
